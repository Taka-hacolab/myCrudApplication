package myApplication.service

import myApplication.model.MyModel
import myApplication.repository.JPAMyModelRepository
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc

@DataJpaTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MyModelServiceTest {
	@Autowired
	private lateinit var mockedMyModelRepository: JPAMyModelRepository
	private lateinit var myModelService: MyModelService

	@Test
	fun `createを実行すると、myModelを作成して保存する` () {
		mockedMyModelRepository.deleteAll()
		myModelService = MyModelServiceImpl(mockedMyModelRepository)

		val newMyModel = MyModel(
			id = 1,
			name = "taro",
			age = 20
		)

		myModelService.create(newMyModel)

		val getAllMyModel = mockedMyModelRepository.findAll()

		assertThat(getAllMyModel[0].name, equalTo("taro"))
		assertThat(getAllMyModel[0].age, equalTo(20))
	}
}
