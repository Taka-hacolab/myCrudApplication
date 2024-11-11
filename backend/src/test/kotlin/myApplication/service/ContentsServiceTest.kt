package myApplication.service

import myApplication.model.Contents
import myApplication.model.RequestContents
import myApplication.repository.JPAContentsRepository
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import java.time.LocalDateTime

@DataJpaTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ContentsServiceTest {
    @Autowired
    private lateinit var contentsRepository: JPAContentsRepository
    private lateinit var contentsService: ContentsService

    @BeforeEach
    fun setup() {
        contentsRepository.deleteAll()
        contentsService = ContentsServiceImpl(contentsRepository)
    }

    @Test
    fun `createを実行すると、contentsを作成して保存する` () {
        val stubContents = RequestContents(
            content = "テストコンテンツ",
            isDone = true
        )

        contentsService.create(stubContents)

        val getAllContents = contentsRepository.findAll()

        assertThat(getAllContents[0].content,equalTo("テストコンテンツ"))
    }

    @Test
    fun `getAllを実行すると、DBに保存されているContentsの情報を返す` () {
        val saveResponse1 = contentsRepository.save(
            Contents(
                content = "保存コンテンツ1",
                isDone = true
            )
        )
        val saveResponse2 = contentsRepository.save(
            Contents(
                content = "保存コンテンツ2",
                isDone = true
            )
        )
        val saveResponse3 = contentsRepository.save(
            Contents(
                content = "保存コンテンツ3",
                isDone = false
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

    @Test
    fun`updateを実行すると、DBに保存しているcontentを書き換えて保存する` () {
        val saveContents = contentsRepository.save(
            Contents(
                content = "hoge",
                isDone = true
            )
        )

        val beforeResponse = contentsRepository.findById(saveContents.id).get()
        contentsService.update(
            RequestContents(
                beforeResponse.id,
                content = "fuga",
                isDone = false
            )
        )

        val afterResponse = contentsRepository.findById(saveContents.id).get()

        assertThat(afterResponse.id, equalTo(saveContents.id))
        assertThat(afterResponse.content, equalTo("fuga"))
    }

    @Test
    fun `deleteを実行すると、DBに保存しているcontentを削除する` () {
        val saveContents = contentsRepository.saveAll(
            listOf(
                Contents(
                content = "fuga",
                isDone = true
            ),
                Contents(
                    content = "piyo",
                    isDone = false
                )
            )
        )

        val beforeDeleteArray = contentsRepository.findAll()
        assert(beforeDeleteArray.size == 2)

        val deleteContent = contentsRepository.findById(saveContents[0].id).get()
        contentsService.delete( deleteContent.id )

        val afterDeleteArray = contentsRepository.findAll()
        assert(afterDeleteArray.size == 1)

        val existContent = afterDeleteArray[0]
        assert(existContent.content == "piyo" )
    }
}