package myApplication.controller

import io.mockk.impl.annotations.MockK
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.verify
import myApplication.model.RequestContents
import myApplication.service.ContentsService
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mock
import org.mockito.Mockito.doNothing
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
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
            MockMvcRequestBuilders.post("/api/content").content(
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
}