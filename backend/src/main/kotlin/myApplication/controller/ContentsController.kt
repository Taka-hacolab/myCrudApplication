package myApplication.controller

import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.service.ContentsService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
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

    @GetMapping("/contents")
    fun getAll(): List<ResponseContents>{
        return contentsService.getAll()
    }

    @PutMapping("/contents")
    fun update(
        @RequestBody
        reqBody: RequestContents
    ){
        contentsService.update(reqBody)
    }

    @DeleteMapping("/contents/{deleteNumber}")
    fun delete(@PathVariable deleteNumber: Int){
        contentsService.delete(deleteNumber)
    }
}