package myApplication.controller

import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.service.ContentsService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.doNothing
import org.mockito.Mockito.doReturn
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
class ContentsControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var mockedContentsService: ContentsService

    @Test
    fun `POSTリクエストを送ると、StatusOKが返り、正しい引数でserviceのcreateが呼ばれる` () {

        val stubContents = RequestContents(
            content = "コンテンツ"
        )
        doNothing().`when`(mockedContentsService).create(stubContents)

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/contents").content(
                """
                    {
                        "content":"コンテンツ"
                    }
                """.trimIndent()
            )
            .contentType("application/json"),
        )
        .andExpect(status().isOk)

        verify(mockedContentsService).create(stubContents)
    }

    @Test
    fun `Getリクエストを送ると、statusOKが返り、serviceのgetAllで呼び出した値を返す` () {
        val stubContents = listOf(
            ResponseContents(
                id = 1,
                content = "コンテンツ1"
            ),
            ResponseContents(
                id = 2,
                content = "コンテンツ2"
            ),
            ResponseContents(
                id = 3,
                content = "コンテンツ3"
            ),
        )

        doReturn(stubContents).`when`(mockedContentsService).getAll()

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/contents")
        )
        .andExpect(status().isOk)
        .andExpect(jsonPath("$[0].id").value(1))
        .andExpect(jsonPath("$[0].content").value("コンテンツ1"))
        .andExpect(jsonPath("$[1].id").value(2))
        .andExpect(jsonPath("$[1].content").value("コンテンツ2"))
        .andExpect(jsonPath("$[2].id").value(3))
        .andExpect(jsonPath("$[2].content").value("コンテンツ3"))

        verify(mockedContentsService).getAll()
    }
}