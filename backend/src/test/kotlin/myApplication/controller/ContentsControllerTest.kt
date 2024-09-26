package myApplication.controller

import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.service.ContentsService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.doReturn
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@SpringBootTest
@AutoConfigureMockMvc
class ContentsControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @InjectMockKs
    private lateinit var contentsController: ContentsController

    @MockK
    private lateinit var contentsService: ContentsService

    @BeforeEach
    fun setup() {
        contentsService = mockk()
        contentsController = ContentsController(contentsService)
        mockMvc = MockMvcBuilders.standaloneSetup(contentsController).build()
    }

    @Test
    fun `POSTリクエストを送ると、StatusOKが返り、正しい引数でserviceのcreateが呼ばれる` () {
        val stubContents = RequestContents(
            content = "コンテンツ",
            status = "notFinished"
        )

        every { contentsService.create(any()) } returns Unit

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/contents").content(
                """
                    {
                        "content":"コンテンツ",
                        "status":"notFinished"
                    }
                """.trimIndent()
            )
            .contentType("application/json"),
        )
        .andExpect(status().isOk)

        verify { contentsService.create(stubContents) }
    }

    @Test
    fun `GETリクエストを送ると、statusOKが返り、serviceのgetAllで呼び出した値を返す` () {
        val stubContents = listOf(
            ResponseContents(
                id = 1,
                content = "コンテンツ1",
                status = "notFinished"
            ),
            ResponseContents(
                id = 2,
                content = "コンテンツ2",
                status = "finished"
            ),
            ResponseContents(
                id = 3,
                content = "コンテンツ3",
                status = "finished"
            ),
        )

        every { contentsService.getAll() } returns stubContents

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/contents")
        )
        .andExpect(status().isOk)
        .andExpect(jsonPath("$[0].id").value(1))
        .andExpect(jsonPath("$[0].content").value("コンテンツ1"))
        .andExpect(jsonPath("$[0].status").value("notFinished"))
        .andExpect(jsonPath("$[1].id").value(2))
        .andExpect(jsonPath("$[1].content").value("コンテンツ2"))
        .andExpect(jsonPath("$[1].status").value("finished"))
        .andExpect(jsonPath("$[2].id").value(3))
        .andExpect(jsonPath("$[2].content").value("コンテンツ3"))
        .andExpect(jsonPath("$[2].status").value("finished"))


        verify { contentsService.getAll() }
    }

    @Test
    fun `PUTリクエストを送ると、statusOKが返り、serviceのupdateを正しい引数で呼ぶ` () {
        every { contentsService.update(any()) } returns Unit

        val stubContents = RequestContents(
            id = 99,
            content = "hogeContents",
            status = "notFinished"
        )

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/contents").content("""
                {
                    "id":"99",
                    "content":"hogeContents",
                    "status":"notFinished"
                }
            """.trimIndent())
                .contentType("application/json")
        )
            .andExpect(status().isOk)
        verify { contentsService.update(stubContents) }
    }
}