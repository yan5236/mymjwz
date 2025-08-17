import { Header } from "@/components/header"
import { Quote, Github, Heart, Users, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageAnimation, SlideInFromTop, SlideInFromLeft, SlideInFromRight } from "@/components/page-animation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 页面标题 */}
          <SlideInFromTop>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Quote className="h-10 w-10 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">关于我们</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                名言名句网是一个致力于传播智慧与正能量的公益项目
              </p>
            </div>
          </SlideInFromTop>

          {/* 项目介绍 */}
          <PageAnimation delay={200}>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-red-500" />
                    <h2 className="text-2xl font-semibold text-foreground">项目愿景</h2>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      我们相信，古今中外的经典名言名句蕴含着深刻的人生智慧和正能量。通过整理、分享这些珍贵的文化财富，
                      我们希望能够为更多人提供精神上的启发和指引，让智慧的光芒照亮每个人的心田。
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      这是一个完全公益性质的项目，我们不以盈利为目的，只为传播知识、分享智慧、弘扬正能量。
                      我们希望通过技术的力量，让这些经典的名言名句能够更便捷地触达每一个需要它们的人。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PageAnimation>

          {/* 功能特色 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PageAnimation delay={400}>
              <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Quote className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">精选内容</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    收录古今中外经典名言名句，每一句都经过精心筛选和整理
                  </p>
                </CardContent>
              </Card>
            </PageAnimation>

            <PageAnimation delay={500}>
              <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-foreground">收藏分享</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    支持收藏喜爱的名言，方便分享给朋友和社交网络
                  </p>
                </CardContent>
              </Card>
            </PageAnimation>

            <PageAnimation delay={600}>
              <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-foreground">开源共建</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    项目完全开源，欢迎社区成员贡献内容和改进功能
                  </p>
                </CardContent>
              </Card>
            </PageAnimation>
          </div>

          {/* 参与贡献 */}
          <SlideInFromLeft delay={700}>
            <Card className="border-border/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <Github className="h-8 w-8 text-foreground" />
                    <h2 className="text-2xl font-semibold text-foreground">参与贡献</h2>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    这是一个开源项目，我们欢迎所有热爱文化、喜欢分享的朋友加入我们。
                    无论是贡献内容、改进功能还是提出建议，您的每一份参与都将让这个项目变得更好。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                      href="https://github.com/yan5236/mymjwz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button className="gap-2" size="lg">
                        <Github className="h-5 w-5" />
                        访问 GitHub 仓库
                      </Button>
                    </a>
                    <a 
                      href="https://github.com/yan5236/mymjwz/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button variant="outline" className="gap-2" size="lg">
                        <Code2 className="h-5 w-5" />
                        提交建议或问题
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideInFromLeft>

          {/* 技术栈 */}
          <SlideInFromRight delay={800}>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="h-6 w-6 text-green-500" />
                    <h2 className="text-2xl font-semibold text-foreground">技术栈</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    本项目采用现代化的 Web 技术栈构建，确保用户体验和开发效率：
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-foreground">Next.js 15</div>
                      <div className="text-sm text-muted-foreground">React 框架</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-foreground">TypeScript</div>
                      <div className="text-sm text-muted-foreground">类型安全</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-foreground">Tailwind CSS</div>
                      <div className="text-sm text-muted-foreground">样式框架</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="font-medium text-foreground">shadcn/ui</div>
                      <div className="text-sm text-muted-foreground">组件库</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideInFromRight>

          {/* 联系方式 */}
          <PageAnimation delay={900}>
            <div className="text-center text-sm text-muted-foreground">
              <p>
                如有任何问题或建议，欢迎通过 GitHub Issues 与我们联系
              </p>
              <p className="mt-2">
                © 2024 名言名句网 - 传播智慧，分享正能量
              </p>
            </div>
          </PageAnimation>
        </div>
      </main>
    </div>
  )
}