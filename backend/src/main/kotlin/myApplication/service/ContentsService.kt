package myApplication.service

import myApplication.model.Contents
import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.repository.JPAContentsRepository
import org.springframework.stereotype.Service

interface ContentsService {
    fun create(newContents: RequestContents)
    fun getAll(): List<ResponseContents>
}

@Service
class ContentsServiceImpl(val contentsRepository: JPAContentsRepository): ContentsService {
    override fun create(newContents: RequestContents) {
        contentsRepository.save(Contents(
            content = newContents.content
        ))
    }

    override fun getAll(): List<ResponseContents> {
        val result = contentsRepository.findAll()
        return result.map{
            ResponseContents(
                it.id,
                it.content
            )
        }
    }
}