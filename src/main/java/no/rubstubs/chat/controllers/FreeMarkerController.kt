package no.rubstubs.chat.controllers

import no.rubstubs.chat.services.MessageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

@Controller
class FreeMarkerController (
    @Autowired val messageService: MessageService
) {
    @RequestMapping(method = [RequestMethod.GET], path = ["/chat"])
    fun chat(
        @CookieValue(value = "alias", defaultValue = "") aliasCookieValue: String,
        model: Model
    ) {
        model.addAttribute("alias", aliasCookieValue)
        model.addAttribute("chatMessages", messageService.getChatMessagesAsHtml())
    }
}