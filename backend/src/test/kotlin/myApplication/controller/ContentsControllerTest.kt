package myApplication.controller

import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import myApplication.model.Contents
import myApplication.model.RequestContents
import myApplication.model.ResponseContents
import myApplication.repository.JPAContentsRepository
import myApplication.service.ContentsService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
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

    @Autowired
    private lateinit var repository: JPAContentsRepository

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
            isDone = true
        )

        every { contentsService.create(any()) } returns Unit

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/contents").content(
                """
                    {
                        "content":"コンテンツ",
                        "isDone":"true"
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
                isDone = true
            ),
            ResponseContents(
                id = 2,
                content = "コンテンツ2",
                isDone = true
            ),
            ResponseContents(
                id = 3,
                content = "コンテンツ3",
                isDone = false
            ),
        )

        every { contentsService.getAll() } returns stubContents

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/contents")
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].content").value("コンテンツ1"))
            .andExpect(jsonPath("$[0].isDone").value(true))
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].content").value("コンテンツ2"))
            .andExpect(jsonPath("$[1].isDone").value(true))
            .andExpect(jsonPath("$[2].id").value(3))
            .andExpect(jsonPath("$[2].content").value("コンテンツ3"))
            .andExpect(jsonPath("$[2].isDone").value(false))

        verify { contentsService.getAll() }
    }

    @Test
    fun `PUTリクエストを送ると、statusOKが返り、serviceのupdateを正しい引数で呼ぶ` () {
        every { contentsService.update(any()) } returns Unit

        val stubContents = RequestContents(
            id = 99,
            content = "hogeContents",
            isDone = true
        )

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/contents").content("""
                {
                    "id":"99",
                    "content":"hogeContents",
                    "isDone":"true"
                }
            """.trimIndent())
                .contentType("application/json")
        )
            .andExpect(status().isOk)
        verify { contentsService.update(stubContents) }
    }

    @Test
    fun `DELETEリクエストを送ると、statusOKが返り、serviceのdeleteを正しい引数で呼ぶ` () {
        val stubContents = Contents(
            content = "hoge",
            isDone = true
        )

        val createdContent = repository.save(stubContents)
        val deleteNumber = createdContent.id

        every { contentsService.delete( any()) } returns Unit

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/contents/${deleteNumber}")
        ).andExpect(status().isOk)

        verify { contentsService.delete( deleteNumber )}
    }
}