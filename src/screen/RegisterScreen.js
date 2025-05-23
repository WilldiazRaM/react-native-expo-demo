import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../utils/api';

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

  // Estados para RadioButtons (Género)
  const [genero, setGenero] = useState(''); // 'masculino', 'femenino', 'otro'
  
  // Estados para Checkboxes (Intereses)
  const [intereses, setIntereses] = useState({
    deportes: false,
    musica: false,
    lectura: false,
    tecnologia: false,
    arte: false
  });

  // Función para manejar cambios en checkboxes
  const toggleInteres = (interes) => {
    setIntereses({
      ...interes,
      [interes]: !interes[interes]
    });
  };

  // Función para registrar usuario
  const registrarUsuario = async () => {
    // Validación de campos obligatorios
    if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena || !genero) {
      Alert.alert('Error', 'Los campos marcados con * son obligatorios');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (edad && isNaN(edad)) {
      Alert.alert('Error', 'La edad debe ser un número');
      return;
    }

    try {
      // Preparar datos para enviar
      const usuario = {
        nombre,
        apellido,
        correo,
        contrasena,
        genero,
        intereses: Object.keys(intereses).filter(key => intereses[key]), // Solo enviar los seleccionados
        ...(edad && { edad: parseInt(edad) }),
        ...(telefono && { telefono }),
        ...(direccion && { direccion }),
      };

      const response = await api.post('/usuarios', usuario);
      
      if (response.data && response.data.nombre) {
        const mensajeExito = `✅ Usuario ${response.data.nombre} registrado con éxito!`;
        
        Platform.OS === 'web' ? alert(mensajeExito) : Alert.alert('Éxito', mensajeExito);
        
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
        setIntereses({
          deportes: false,
          musica: false,
          lectura: false,
          tecnologia: false,
          arte: false
        });
      } 
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Error en el registro');
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

        {/* Sección de intereses (Checkboxes) */}
        <Text style={styles.sectionTitle}>Intereses</Text>
        
        <View style={styles.checkboxContainer}>
          {Object.keys(intereses).map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.checkboxOption}
              onPress={() => toggleInteres(item)}
            >
              <Checkbox
                status={intereses[item] ? 'checked' : 'unchecked'}
                onPress={() => toggleInteres(item)}
                color="#007bff"
              />
              <Text style={styles.checkboxLabel}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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
});