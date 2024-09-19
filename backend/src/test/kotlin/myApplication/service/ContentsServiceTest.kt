package myApplication.service

import myApplication.model.Contents
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

    @Test
    fun `getAllを実行すると、DBに保存されているContentsの情報を返す` () {
        mockedContentsRepository.deleteAll()
        contentsService = ContentsServiceImpl(mockedContentsRepository)

        val saveResponse1 = mockedContentsRepository.save(
            Contents(
                content = "保存コンテンツ1"
            )
        )
        val saveResponse2 = mockedContentsRepository.save(
            Contents(
                content = "保存コンテンツ2"
            )
        )
        val saveResponse3 = mockedContentsRepository.save(
            Contents(
                content = "保存コンテンツ3"
            )
        )

        val response = contentsService.getAll()

        assertThat(response[0].id, equalTo(saveResponse1.id))
        assertThat(response[0].content, equalTo(saveResponse1.content))
        assertThat(response[1].id, equalTo(saveResponse2.id))
        assertThat(response[1].content, equalTo(saveResponse2.content))
        assertThat(response[2].id, equalTo(saveResponse3.id))
        assertThat(response[2].content, equalTo(saveResponse3.content))
    }
}