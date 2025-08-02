import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function SimpleChatRequest() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const sendToChatbot = async () => {
  if (!input.trim()) return;

  try {
    const res = await fetch('https://zayed43.app.n8n.cloud/webhook/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // ✅ Extract from array response
    const reply = Array.isArray(data) && data[0]?.output
      ? data[0].output
      : 'No reply received.';

    setResponse(reply);
  } catch (err) {
    console.error('Chatbot error:', err);
    setResponse('Something went wrong.');
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send to Chatbot" onPress={sendToChatbot} />
      <Text style={styles.responseText}>Reply: {response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
