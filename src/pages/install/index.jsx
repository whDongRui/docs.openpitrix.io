import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ReactComponent as InstallAll } from '../../assets/install/all.svg'

import { Style } from './styled'

const installs = [
  {
    icon: InstallAll,
    title: 'All-in-One 模式',
    type: 'all',
    description:
      'All-in-One 模式，即单节点部署，需要预先安装 Docker 、 Docker-Compose 、 Make 等依赖软件。',
  },
  {
    icon: '',
    title: 'Kubernetes 模式',
    type: 'kubernetes',
    description:
      '部署到 Kubernetes 集群环境中， OpenPitrix 可作为基于 Kubernetes 的一个应用管理系统。',
  },
  {
    icon: '',
    title: 'Helm-Chart 模式',
    type: 'helm',
    description:
      '将 OpenPitrix 以 Helm Chart 的方式部署到 Kubernetes 集群环境中，需要预先安装 Helm Client 和 Tille 。',
  },
]

class Install extends Component {
  state = {
    activeType: 'all',
  }

  selectInstall = type => {
    this.setState({ activeType: type })
  }

  renderCard(item) {
    return (
      <div className="card" onClick={() => this.selectInstall(item.type)}>
        <div className="icon">
          <InstallAll />
        </div>
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
      </div>
    )
  }

  render() {
    const { activeType } = this.state;
    const showData = _.get(this.props, `data.${activeType}`, {});
    const title = _.get(showData,  'frontmatter.title', '');

    return (
      <Style>
        <Header maxTop={150} />
        <div className="installBanner">
          <div className="bannerWord">
            <h2>OpenPitrix 安装</h2>
            <h5>
              OpenPitrix 支持 all-in-one 、 Kubernetes 和 Helm Chart
              三种部署模式。
            </h5>
            {installs.map(item => {
              const activeClass = item.type === activeType ? 'active' : ''

              return (
                <div className={`cardOuter ${activeClass}`} key={item.title}>
                  {this.renderCard(item)}
                </div>
              )
            })}
          </div>
        </div>

        <div className="installContent">
          {showData.html && (
            <div className="markdown">
              <div className='title'>{title}</div>
              <div dangerouslySetInnerHTML={{ __html: showData.html }} />
            </div>
          )}
        </div>

        <Footer />
      </Style>
    )
  }
}

export default Install

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query queryAll {
    all: markdownRemark(
      fields: { slug: { eq: "/v0.3/zh-CN/installation/allinone/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
    kubernetes: markdownRemark(
      fields: { slug: { eq: "/v0.3/zh-CN/installation/kubernetes/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
    helm: markdownRemark(
      fields: { slug: { eq: "/v0.3/zh-CN/installation/helm-chart/" } }
    ) {
      html
      frontmatter {
        title
      }
      fields {
        version
      }
      headings {
        value
        depth
      }
    }
  }
`