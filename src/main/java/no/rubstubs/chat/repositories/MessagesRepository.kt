package no.rubstubs.chat.repositories

import no.rubstubs.chat.models.MessageModel
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface MessagesRepository: MongoRepository<MessageModel,String>