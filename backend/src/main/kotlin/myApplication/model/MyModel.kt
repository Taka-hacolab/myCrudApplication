package myApplication.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "my_model")
data class MyModel (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,
    val name: String,
    val age: Int
)

data class RequestMyModel (
    val name: String,
    val age: Int
)

data class ResponseMyModel (
    val id: Int,
    val name: String,
    val age: Int
)