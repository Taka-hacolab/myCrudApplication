package myApplication.service

import myApplication.model.MyModel
import myApplication.model.RequestMyModel
import myApplication.repository.JPAMyModelRepository
import org.springframework.stereotype.Service

interface MyModelService {
    fun create(newMyModel: RequestMyModel)
}

@Service
class MyModelServiceImpl(val myModelRepository: JPAMyModelRepository): MyModelService {
    override fun create(newMyModel: RequestMyModel){
        myModelRepository.save(
            MyModel(
                name = newMyModel.name,
                age = newMyModel.age,
            )
        )
    }
}