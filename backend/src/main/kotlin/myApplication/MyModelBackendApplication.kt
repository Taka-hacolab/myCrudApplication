package myApplication

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MyModelBackendApplication

fun main(args: Array<String>) {
	runApplication<MyModelBackendApplication>(*args)
}
