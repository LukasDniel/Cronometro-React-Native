import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;

let seg = 0;
let min = 0;
let hor = 0;

export default function App(){

    const [numero, setNumero] = useState(0);
    const [botao, setBotao] = useState('Vai');
    const [ultimo, setUltimo] = useState(null);

    function vai(){

      if(timer !== null){
        // aqui vai parar o timer
        clearInterval(timer);
        timer = null;

        setBotao('Vai');
      }else{
        // Começar a girar o time
        timer = setInterval(() => {
          seg++;
          
          if(seg == 60){
            seg = 0;
            min++;
          }

          if(min == 60){
            min = 0;
            hor++
          }

          let format = (hor < 10 ? '0' + hor : hor) + ':'
           + (min < 10 ? '0' + min : min) + ':' 
           + (seg < 10 ? '0' + seg : seg);

          setNumero(format);

        }, 1000);
        setBotao('Pausar');
      }

    }


    function limpar(){
      if(timer !== null){
        clearInterval(timer);
        timer = null;
      }

      setUltimo(numero);
      setNumero(0);
      seg = 0;
      min = 0;
      hor = 0;
      setBotao('Vai');
    }

    return(
      <View style={styles.container}>

        <Image
          source={require('./src/crono.png')}
        />

        <Text style={styles.timer}> {numero} </Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={vai}>
            <Text style={styles.btnTexto}> {botao} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={limpar}>
            <Text style={styles.btnTexto}> Limpar </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltima}>
          <Text style={styles.textoCorrida}>
          { ultimo ? 'Ultimo tempo: ' + ultimo : ''}
          </Text>
        </View>



      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aeef'
  },

  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },

  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },

  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },

  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },

  areaUltima:{
    marginTop: 40,
  },

  textoCorrida:{
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  }


});