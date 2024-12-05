import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importando o ícone de telefone

const HelpScreen = () => {
  const [messages, setMessages] = useState([
    {
      sender: "site",
      text: "Olá! Como posso ajudar você hoje?",
    },
    {
      sender: "site",
      text: "Clique abaixo para escolher uma opção de ajuda.",
    },
    {
      sender: "app",
      text: "1. Como alterar meu perfil?",
      option: "1",
    },
    {
      sender: "app",
      text: "2. Como redefinir minha senha?",
      option: "2",
    },
    {
      sender: "app",
      text: "3. Como ver minhas estatísticas?",
      option: "3",
    },
    {
      sender: "app",
      text: "4. Como adicionar novas receitas?",
      option: "4",
    },
    {
      sender: "app",
      text: "5. Como contato o suporte?",
      option: "5",
    },
  ]);

  const handleMessageClick = (option) => {
    let response = "";

    switch (option) {
      case "1":
        response =
          "Para alterar seu perfil, vá até a tela de configurações e clique em 'Editar Conta'. Lá, você poderá alterar seu nome, foto de perfil e outros dados.";
        break;
      case "2":
        response =
          "Para redefinir sua senha, vá até a tela de login e clique em 'Esqueci minha senha'. Você receberá um e-mail com as instruções para redefinir a senha.";
        break;
      case "3":
        response =
          "Para ver suas estatísticas, acesse a tela de 'Metas'. Lá você verá o número de passos e calorias queimadas, além de gráficos de progresso.";
        break;
      case "4":
        response =
          "Para adicionar novas receitas, acesse a tela de receitas, clique no ícone de '+' no canto superior direito e preencha as informações da receita.";
        break;
      case "5":
        response =
          "Se você precisar de ajuda adicional, pode entrar em contato com o suporte através da tela de 'Configurações' e clicar em 'Ajuda'.";
        break;
      default:
        response = "Desculpe, não entendi sua solicitação.";
    }

    setMessages([
      ...messages,
      { sender: "user", text: `Opção ${option}` },
      { sender: "app", text: response },
      { sender: "app", text: "Precisa de mais ajuda? Digite abaixo!" }, // Mensagem fake
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header da conversa */}
      <View style={styles.header}>
        <Image
          source={require("../assets/avatares/avatar1.png")}
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>Assistente Vitality</Text>
          <Text style={styles.headerStatus}>Online agora</Text>
        </View>
        {/* Ícone de telefone */}
        <Icon name="phone" size={20} color="#4CAF50" style={styles.phoneIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.sender === "site"
                ? styles.siteMessage
                : msg.sender === "user"
                ? styles.userMessage
                : styles.appMessage
            }
          >
            <TouchableOpacity
              onPress={() =>
                msg.sender === "app" && handleMessageClick(msg.option)
              }
            >
              <Text
                style={
                  msg.sender === "site"
                    ? styles.siteText
                    : msg.sender === "user"
                    ? styles.userText
                    : styles.appText
                }
              >
                {msg.text}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Campo de mensagem fake */}
      <View style={styles.fakeMessageContainer}>
        <TextInput
          style={styles.fakeInput}
          placeholder="Digite sua mensagem..."
          editable={false}
        />
        <Button title="Enviar" disabled={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "#f5f5f5",
  },
  // Estilos do Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerStatus: {
    fontSize: 14,
    color: "#4CAF50", // Verde para o "online"
  },
  phoneIcon: {
    marginLeft: "auto", // Coloca o ícone no final da linha
    marginRight: 20,
  },

  // Estilos do Chat
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
    marginTop: 10,
    marginLeft: 5,
  },
  siteMessage: {
    backgroundColor: "#d1e7dd", // Verde claro para o site
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  appMessage: {
    backgroundColor: "#7DCD9A", // Verde para as respostas do app
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-start", // Colocando a resposta do app à esquerda
  },
  userMessage: {
    backgroundColor: "#FF6F61", // Vermelho claro para as mensagens do usuário
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%",
    alignSelf: "flex-end", // Mensagem do usuário à direita
  },
  siteText: {
    color: "#000",
    fontSize: 16,
  },
  appText: {
    color: "#fff",
    fontSize: 16,
    padding: 8,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
    padding: 8,
  },
  fakeMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  fakeInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    paddingLeft: 20,
  },
});

export default HelpScreen;
