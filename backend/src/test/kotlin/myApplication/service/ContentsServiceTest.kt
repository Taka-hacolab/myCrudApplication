package myApplication.service

import myApplication.model.RequestContents
import myApplication.repository.JPAContentsRepository
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
class ContentsServiceTest {
    @Autowired
    private lateinit var mockedContentsRepository: JPAContentsRepository
    private lateinit var contentsService: ContentsService

    @Test
    fun `createを実行すると、contentsを作成して保存する` () {
        mockedContentsRepository.deleteAll()
        contentsService = ContentsServiceImpl(mockedContentsRepository)

        val stubContents = RequestContents(
            content = "テストコンテンツ"
        )

        contentsService.create(stubContents)

        val getAllContents = mockedContentsRepository.findAll()

        assertThat(getAllContents[0].content,equalTo("テストコンテンツ"))
    }
}