package myApplication.controller

import myApplication.model.RequestMyModel
import myApplication.service.MyModelService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class MyModelController(val myModelService: MyModelService) {

    @PostMapping("/mymodel")
    fun create(
        @RequestBody
        reqBody: RequestMyModel
    ){
        myModelService.create(reqBody)
    }

}