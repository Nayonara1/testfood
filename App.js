import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useBackHandler } from '@react-native-community/hooks';
import { collection, getDocs } from "firebase/firestore";
import Paho from "paho-mqtt"


 

// const database = firebase.firestore();
// var clientID = "ID-" + Math.round(Math.random() * 1000);
const client = new Paho.Client(
    'broker.emqx.io',
    8083,
    '/'
)
// 'broker.emqx.io',
// 8083,
// // '10.44.1.35',
// // 9001,
// '/'
// // clientID
client.connect({
    onSuccess: function () {
        console.log("connected")
        // console.log(clientID)
        // client.subscribe("esp32/output")
        // client.subscribe("esp32/distance")
        client.subscribe("alimentador"); // As linhas a seguir sao uma tentativa de envio de mensagem
    },
    onFailure: function () {
        console.log("Desconectado")
    },
    // userName: 'emqx',
    // password: 'public',
    // useSSL: true,
})

function ligar() {
    const message1 = new Paho.Message("on"); // AGORA funcionando
    message1.destinationName = "alimentador"; // para testar

    client.send(message1); // abrir o broker online
}

function desligar() {
    const message1 = new Paho.Message("off"); // AGORA funcionando
    message1.destinationName = "alimentador"; // para testar

    client.send(message1); // abrir o broker online
}

export default function App({  navigation}) {
 
 
 
   return (
    <View>
        <TouchableOpacity onPress={ligar}>
            <Text>ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={desligar}>
            <Text>desligar</Text>
        </TouchableOpacity>
    </View>
   )
 
}