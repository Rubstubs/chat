package no.rubstubs.chat.models

import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "Messages")
data class MessageModel(val timeStamp: String, val name: String, val messageText: String)
