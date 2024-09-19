package myApplication.service

import myApplication.model.Contents
import myApplication.model.RequestContents
import myApplication.repository.JPAContentsRepository
import org.springframework.stereotype.Service

interface ContentsService {
    fun create(newContents: RequestContents)
}

@Service
class ContentsServiceImpl(val contentsRepository: JPAContentsRepository): ContentsService {
    override fun create(newContents: RequestContents) {
        contentsRepository.save(Contents(
            content = newContents.content
        ))
    }
}