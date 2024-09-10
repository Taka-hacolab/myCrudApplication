package myApplication.service

import myApplication.model.MyModel
import myApplication.repository.JPAMyModelRepository
import org.springframework.stereotype.Service

interface MyModelService {
    fun create(newMyModel: MyModel)
}

@Service
class MyModelServiceImpl(val myModelRepository: JPAMyModelRepository):MyModelService {
    override fun create(newMyModel: MyModel){
        myModelRepository.save(newMyModel)
    }
}