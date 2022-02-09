package no.rubstubs.chat.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

@Controller
class FreeMarkerController {
    @RequestMapping(method = [RequestMethod.GET], path = ["/chat"])
    fun chat(
        @CookieValue(value = "alias", defaultValue = "") aliasCookieValue: String,
        model: Model
    ) {
        model.addAttribute("alias", aliasCookieValue)
    }
}