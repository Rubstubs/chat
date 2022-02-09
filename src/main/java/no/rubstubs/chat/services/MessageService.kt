package no.rubstubs.chat.services

import no.rubstubs.chat.repositories.MessagesRepository
import org.jsoup.Jsoup
import org.jsoup.safety.Safelist
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MessageService (
    @Autowired private val messagesRepository: MessagesRepository
) {
    fun getChatMessagesAsHtml(): String {
        val previousMessages = StringBuilder()
        val allMessages = messagesRepository.findAll()
        allMessages.map {
            previousMessages.append(
                "<div>" +
                        "<p class=\"chat-message-name\"><strong>${it.name}</strong></p>" +
                        "<p class=\"chat-message-timestamp\">${it.timeStamp}</p>" +
                        "<p class=\"chat-message-text\">${it.messageText}</p>" +
                        "</div>"
            ) }
        return previousMessages.toString()
    }

    fun resetDb() {
        messagesRepository.deleteAll()
        getChatMessagesAsHtml()
    }

    fun sanitizeMessage(message: String): String {
        if (message.isEmpty()) return "empty message"
        val doc = Jsoup.parse(message)
        return Jsoup.clean(doc.text(), Safelist.relaxed())
    }

    fun sanitizeAlias(message: String): String {
        if (message.isEmpty()) return "Anonymous"
        val doc = Jsoup.parse(message)
        return Jsoup.clean(doc.text(), Safelist.relaxed())
    }
}