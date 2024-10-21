package myApplication.service

import myApplication.model.Contents
import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.repository.JPAContentsRepository
import org.springframework.stereotype.Service

interface ContentsService {
    fun create(newContents: RequestContents): Unit
    fun getAll(): List<ResponseContents>

    fun update(updateContents: RequestContents): Unit

    fun delete(id: Int): Unit
}

@Service
class ContentsServiceImpl(val contentsRepository: JPAContentsRepository): ContentsService {
    override fun create(newContents: RequestContents) {
        contentsRepository.save(Contents(
            content = newContents.content,
        ))
    }

    override fun getAll(): List<ResponseContents> {
        val result = contentsRepository.findAll()
        return result.map{
            ResponseContents(
                it.id,
                it.content,
                it.isDone
            )
        }
    }

    override fun update(updateContents: RequestContents) {
        val result = contentsRepository.findById(updateContents.id!!).get()
        contentsRepository.save(
            Contents(
                result.id,
                updateContents.content,
                updateContents.isDone
            )
        )
    }

    override fun delete(id: Int) {
        val deleteContent = contentsRepository.findById(id)
        contentsRepository.delete(deleteContent.get())
    }
}