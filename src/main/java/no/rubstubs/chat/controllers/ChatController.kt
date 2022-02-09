package no.rubstubs.chat.controllers

import no.rubstubs.chat.models.MessageModel
import no.rubstubs.chat.repositories.MessagesRepository
import no.rubstubs.chat.services.MessageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.function.Function
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpServletResponse.SC_OK

@RestController
class ChatController (
    @Autowired private val messageService: MessageService,
    @Autowired private val messagesRepository: MessagesRepository
){

    @GetMapping("/")
    fun handleMessageBoard(response: HttpServletResponse) {
        response.sendRedirect("/chat")
    }

    @GetMapping("favicon.ico")
    @ResponseBody
    fun returnNoFavicon() {
    }

    @PostMapping("/reset")
    fun handleResetDb(response: HttpServletResponse){
        messageService.resetDb()
        response.sendRedirect("/chat")
    }

    @PostMapping("/postMessage")
    fun handlePostMessage(
        @CookieValue(value = "alias", defaultValue = "") alias: String,
        @RequestParam message: String,
        response: HttpServletResponse
    ) {
        if (alias.isNotEmpty()) {
            messagesRepository.save(
                MessageModel(
                    LocalDateTime.now().toString(),
                    alias,
                    messageService.sanitizeMessage(message)
                )
            )
        }
        response.sendRedirect("/")
    }

    @GetMapping("/numberOfMessages")
    fun handleNumberOfMessages(): Int {
        return messagesRepository.findAll().size
    }

    @GetMapping("/getAllMessages")
    fun handleGetAllMessages(): String {
        return messageService.getChatMessagesAsHtml()
    }

    @GetMapping(path = ["/messages/stream"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun feed(): Flux<String> {
        return Flux.interval(Duration.ofMillis(1000))
            .map {
                messageService.getChatMessagesAsHtml()
            }
    }
}