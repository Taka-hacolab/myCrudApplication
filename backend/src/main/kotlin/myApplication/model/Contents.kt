package myApplication.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "contents")
data class Contents (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,
    val content: String,
    val status: String
)

data class RequestContents (
    val id: Int? = null,
    val content: String,
    val status: String
)

data class ResponseContents (
    val id: Int,
    val content: String,
    val status: String
)