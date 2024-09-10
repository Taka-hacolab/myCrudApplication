package myApplication.repository

import myApplication.model.MyModel
import org.springframework.data.jpa.repository.JpaRepository

interface JPAMyModelRepository : JpaRepository<MyModel, Int>