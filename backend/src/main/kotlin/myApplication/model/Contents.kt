package myApplication.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "contents")
data class Contents (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,
    val content: String,
    @Column(name = "is_done")
    val isDone: Boolean = false,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

data class RequestContents (
    val id: Int? = null,
    val content: String,
    val isDone: Boolean,
)

data class ResponseContents (
    val id: Int,
    val content: String,
    val isDone: Boolean,
)