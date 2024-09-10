package myApplication.service

import myApplication.model.MyModel
import myApplication.repository.JPAMyModelRepository
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean

@SpringBootTest
@AutoConfigureMockMvc
class MyModelControllerTest {
	@Autowired
	private lateinit var mockedMyModelRepository: JPAMyModelRepository

	@MockBean
	private lateinit var myModelservice: MyModelService

	@Test
	fun `createを実行すると、myModelを作成して保存する` () {
		mockedMyModelRepository.deleteAll()

		val newMyModel = MyModel(
			id = 1,
			name = "taro",
			age = 20
		)

		myModelservice.create(newMyModel)

		val getAllMyModel = mockedMyModelRepository.findAll()

		assertThat(getAllMyModel[0].id, equalTo(1))
		assertThat(getAllMyModel[0].name, equalTo("taro"))
		assertThat(getAllMyModel[0].age, equalTo(20))
	}
}
