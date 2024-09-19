package myApplication.controller

import myApplication.model.RequestContents
import myApplication.service.ContentsService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ContentsController(val contentsService: ContentsService) {
    @PostMapping("/contents")
    fun create(
        @RequestBody
        reqBody: RequestContents
    ){
        contentsService.create(reqBody)
    }
}