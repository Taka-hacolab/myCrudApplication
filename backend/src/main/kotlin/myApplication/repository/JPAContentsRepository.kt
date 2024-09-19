package myApplication.repository

import myApplication.model.Contents
import org.springframework.data.jpa.repository.JpaRepository

interface JPAContentsRepository: JpaRepository<Contents, Int>