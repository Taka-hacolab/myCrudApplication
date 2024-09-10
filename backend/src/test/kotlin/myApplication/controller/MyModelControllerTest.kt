package myApplication.controller

import myApplication.model.MyModel
import myApplication.service.MyModelService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import com.ninjasquad.springmockk.MockkBean
import io.mockk.justRun
import io.mockk.verify

@SpringBootTest
@AutoConfigureMockMvc
class MyModelControllerTest {
	@Autowired
	private lateinit var mockMvc: MockMvc

	@MockkBean
	private lateinit var mockedMyModelService: MyModelService

	@Test
	fun `postリクエストをすると、statusOKが返り、リクエストボディにセットした値を引数にserviceのcreateを呼ぶ` () {
		justRun { mockedMyModelService.create(any()) }

		val mockedMyModel = MyModel(
			id = 1,
			name = "hoge",
			age = 20
		)

		mockMvc.perform(
			MockMvcRequestBuilders.post("/api/mymodel")
				.content("""
					{
						"id":1,
						"name":"hoge",
						"age":20
					}
				""".trimIndent()
				)
				.contentType("application/json"),
		)
		.andExpect(status().isOk)

		verify { mockedMyModelService.create(mockedMyModel) }
	}

}
