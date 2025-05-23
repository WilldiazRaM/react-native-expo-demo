import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Eliminamos el Checkbox ya que no lo usaremos más
import { Picker } from '@react-native-picker/picker'; // Importamos el Picker para el dropdown
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../utils/api';


// Función de alerta multiplataforma
const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    // Si hay un callback para el botón OK en web
    if (buttons[0]?.onPress) {
      buttons[0].onPress();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};

export default function RegisterScreen() {
  // Estados para campos de texto
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  // Estado para RadioButtons (Género)
  const [genero, setGenero] = useState(''); // 'masculino', 'femenino', 'otro'
  
  // Estados para Intereses (ahora con dropdown)
  const [interesesSeleccionados, setInteresesSeleccionados] = useState([]); // Array para guardar los intereses seleccionados
  const [mostrarDropdown, setMostrarDropdown] = useState(false); // Controla la visibilidad del dropdown
  
  // Lista de posibles intereses
  const listaIntereses = [
    { id: 'deportes', nombre: 'Deportes' },
    { id: 'musica', nombre: 'Música' },
    { id: 'lectura', nombre: 'Lectura' },
    { id: 'tecnologia', nombre: 'Tecnología' },
    { id: 'arte', nombre: 'Arte' }
  ];

  // Función para manejar selección de intereses en el dropdown
  const seleccionarInteres = (interesId) => {
    // Verificamos si el interés ya está seleccionado
    const existe = interesesSeleccionados.includes(interesId);
    
    if (existe) {
      // Si ya está, lo quitamos del array
      setInteresesSeleccionados(interesesSeleccionados.filter(id => id !== interesId));
    } else {
      // Si no está, lo agregamos al array
      setInteresesSeleccionados([...interesesSeleccionados, interesId]);
    }
  };

// Función para registrar usuario 
const registrarUsuario = async () => {
    // Validación de campos obligatorios
    if (!nombre) {
      showAlert('Error', 'Por favor ingresa tu nombre');
      return;
    }
    if (!apellido) {
      showAlert('Error', 'Por favor ingresa tu apellido');
      return;
    }
    if (!correo) {
      showAlert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      showAlert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }
    if (!contrasena) {
      showAlert('Error', 'Por favor ingresa una contraseña');
      return;
    } else if (contrasena.length < 6) {
      showAlert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (!confirmarContrasena) {
      showAlert('Error', 'Por favor confirma tu contraseña');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      showAlert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (!genero) {
      showAlert('Error', 'Por favor selecciona tu género');
      return;
    }
    if (edad && isNaN(edad)) {
      showAlert('Error', 'La edad debe ser un número válido');
      return;
    }

    try {
      // Mostrar indicador de carga
      showAlert('Procesando', 'Registrando tu información...');

      // Preparar datos para enviar
      const usuario = {
        nombre,
        apellido,
        correo,
        contrasena,
        genero,
        intereses: interesesSeleccionados,
        ...(edad && { edad: parseInt(edad) }),
        ...(telefono && { telefono }),
        ...(direccion && { direccion }),
      };

      const response = await api.post('/usuarios', usuario);
      
      if (response.data && response.data.success) {
        showAlert(
          '¡Registro Exitoso!', 
          `Hola ${response.data.usuario.nombre}, tu registro se completó correctamente.`,
          [
            { 
              text: 'OK', 
              onPress: () => {
                // Resetear formulario
                setNombre('');
                setApellido('');
                setCorreo('');
                setContrasena('');
                setConfirmarContrasena('');
                setEdad('');
                setTelefono('');
                setDireccion('');
                setGenero('');
                setInteresesSeleccionados([]);
              }
            }
          ]
        );
      } else {
        showAlert(
          'Registro incompleto', 
          'Recibimos tu información pero hubo un problema al finalizar. Por favor contacta al soporte.'
        );
      }
      
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message);
      
      // Manejo específico para correo duplicado
      if (error.response?.status === 409) {
        showAlert(
          'Correo ya registrado', 
          'El correo electrónico ya está en uso. ¿Quieres recuperar tu contraseña?',
          [
            { text: 'Recuperar contraseña', onPress: () => navigation.navigate('Recovery') },
            { text: 'Intentar con otro correo' }
          ]
        );
        return;
      }
      
      // Manejo de errores de validación del servidor
      if (error.response?.status === 400) {
        showAlert(
          'Datos incorrectos', 
          error.response.data.message || 'Por favor verifica la información ingresada'
        );
        return;
      }
      
      // Manejo de errores de conexión
      if (error.message === 'Network Error') {
        showAlert(
          'Error de conexión', 
          'No se pudo conectar al servidor. Verifica tu conexión a internet.'
        );
        return;
      }
      
      // Error genérico
      showAlert(
        'Error inesperado', 
        'Ocurrió un problema al registrar. Por favor intenta nuevamente más tarde.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>

        {/* Sección de información básica */}
        <Text style={styles.sectionTitle}>Información Personal</Text>
        
        <Text style={styles.label}>Nombre *</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />

        <Text style={styles.label}>Apellido *</Text>
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />

        <Text style={styles.label}>Género *</Text>
        <View style={styles.radioGroup}>
          {/* RadioButton para Masculino */}
          <TouchableOpacity 
            style={styles.radioOption} 
            onPress={() => setGenero('masculino')}
          >
            <RadioButton
              value="masculino"
              status={genero === 'masculino' ? 'checked' : 'unchecked'}
              onPress={() => setGenero('masculino')}
              color="#007bff"
            />
            <Text>Masculino</Text>
          </TouchableOpacity>

          {/* RadioButton para Femenino */}
          <TouchableOpacity 
            style={styles.radioOption} 
            onPress={() => setGenero('femenino')}
          >
            <RadioButton
              value="femenino"
              status={genero === 'femenino' ? 'checked' : 'unchecked'}
              onPress={() => setGenero('femenino')}
              color="#007bff"
            />
            <Text>Femenino</Text>
          </TouchableOpacity>

          {/* RadioButton para Otro */}
          <TouchableOpacity 
            style={styles.radioOption} 
            onPress={() => setGenero('otro')}
          >
            <RadioButton
              value="otro"
              status={genero === 'otro' ? 'checked' : 'unchecked'}
              onPress={() => setGenero('otro')}
              color="#007bff"
            />
            <Text>Otro</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Edad</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Edad" 
          value={edad} 
          onChangeText={setEdad} 
          keyboardType="numeric" 
        />

        {/* Sección de contacto */}
        <Text style={styles.sectionTitle}>Información de Contacto</Text>
        
        <Text style={styles.label}>Correo electrónico *</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Dirección completa"
          value={direccion}
          onChangeText={setDireccion}
          multiline
        />

        {/* Sección de seguridad */}
        <Text style={styles.sectionTitle}>Seguridad</Text>
        
        <Text style={styles.label}>Contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
          secureTextEntry
        />

        {/* Sección de intereses (ahora con Dropdown) */}
        <Text style={styles.sectionTitle}>Intereses</Text>
        
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setMostrarDropdown(!mostrarDropdown)}
        >
          <Text style={styles.dropdownButtonText}>
            {interesesSeleccionados.length > 0 
              ? `Seleccionados: ${interesesSeleccionados.length}`
              : "Selecciona tus intereses"}
          </Text>
          <Icon 
            name={mostrarDropdown ? "arrow-drop-up" : "arrow-drop-down"} 
            size={24} 
            color="#555" 
          />
        </TouchableOpacity>
        
        {mostrarDropdown && (
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={null} // No mostramos selección individual
              onValueChange={seleccionarInteres}
              mode="dropdown"
              style={styles.picker}
              dropdownIconColor="#007bff"
            >
              {listaIntereses.map((interes) => (
                <Picker.Item 
                  key={interes.id}
                  label={interes.nombre}
                  value={interes.id}
                  // Mostramos un checkmark si el interés está seleccionado
                  style={interesesSeleccionados.includes(interes.id) 
                    ? styles.itemSeleccionado 
                    : styles.itemNoSeleccionado
                  }
                />
              ))}
            </Picker>
          </View>
        )}
        
        {/* Mostrar intereses seleccionados */}
        {interesesSeleccionados.length > 0 && (
          <View style={styles.interesesSeleccionadosContainer}>
            <Text style={styles.interesesTitulo}>Intereses seleccionados:</Text>
            <View style={styles.interesesLista}>
              {interesesSeleccionados.map(id => {
                const interes = listaIntereses.find(i => i.id === id);
                return (
                  <View key={id} style={styles.interesTag}>
                    <Text style={styles.interesTagText}>{interes.nombre}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Botón de registro */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Registrarse" 
            onPress={registrarUsuario} 
            color="#007bff"
          />
        </View>

        <Text style={styles.requiredNote}>* Campos obligatorios</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  requiredNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  // Estilos para el dropdown
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#555',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    width: '100%',
  },
  itemSeleccionado: {
    backgroundColor: '#e6f2ff', // Fondo azul claro para items seleccionados
    color: '#007bff',
    fontWeight: 'bold',
  },
  itemNoSeleccionado: {
    backgroundColor: '#fff',
  },
  // Estilos para mostrar los intereses seleccionados
  interesesSeleccionadosContainer: {
    marginBottom: 15,
  },
  interesesTitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  interesesLista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interesTag: {
    backgroundColor: '#e6f2ff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  interesTagText: {
    color: '#007bff',
    fontSize: 14,
  },
});