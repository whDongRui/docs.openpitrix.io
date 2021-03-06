---
title: "应用管理"
---
应用为用户提供完整的业务功能，由一个或多个特定功能的组件组成（例如在 WordPress 博客网站中一个 PHP 的前端和 MySQL 后端就是不同的两个组件），每个组件可以独立于其他组件启动、运行、治理。一个应用或它的一个组件可包含一个或多个版本。
多云环境下如何实现应用的统一打包、部署，如何在应用的生命周期中实现统一管理，开发者如何将自己的应用共享给用户，如何实现应用的商业化运营？对于这一类场景 OpenPitrix 提供了非常适合的解决方案。

本节提到的应用管理，实际是指应用生命周期管理。OpenPitrix 提供了如应用创建、打包上传、应用审核、应用上架、测试部署、版本管理、应用下架等功能，对应用的生命周期有完整的管理机制。在 OpenPitrix 中，开发者能够创建应用和创建新的版本，应用的开发支持 [OpenPitrix 开发规范](../../developer-guide/openpitrix-specification) 或 [Helm Chart 开发规范](../../developer-guide/helm-specification) 。当开发者在本地完成开发并准备好应用配置包后（应用配置包是一组根据应用开发模版规范描述应用实例的文件组成，用于创建应用），即可登录 OpenPitrix 控制台上传自己的应用，以下介绍如何进行应用管理。

## 上传应用

1、开发者登录 OpenPitrix 控制台，选择左边菜单栏 **我的应用**，然后点击 **“+”** 或点击 **创建**。

![创建应用](/overview-page.png)

2、选择预先创建好的应用仓库，若还未创建应用仓库，请参考 [仓库管理 - 创建仓库](../../user-guide/repo-management/#创建仓库) 来创建。完成后点击 **下一步**。

![选择仓库](/select-repo.png)

3、从本地上传应用配置包，注意，配置文件中应用的名字（package.json 的 name 字段值）不能与应用仓库中已有应用的名字重复，否则将无法上传。

![上传应用配置包](/upload-package.png)

4、若配置包符合开发规范，则提示上传成功。

![上传成功](/upload-success.png)

## 查看应用

配置包上传成功后，开发者和管理员可部署和测试应用。在 **我的应用** 中查看应用列表，管理员能够查看平台中所有的应用，而开发者只能查看自己上传的应用，普通用户在商店可查看已上架的应用。应用的状态分为待提交、已上架、已下架、已删除等四种状态。

![](/all-app-list.png) 
## 部署应用

平台的所有用户均可部署应用到运行环境中，在应用列表或商店中点击应用进入应用详情，点击 **部署** 即可。注意，部署依赖 QingCloud、AWS、Kubernetes 这类运行环境，所以在部署前需要创建运行环境并申请相关的资源。以下准备了三个示例将应用分别部署到 QingCloud、AWS 和 Kubernetes 环境中：

- [部署 Wordpress 到 QingCloud](../../user-guide/deploying-app-on-qingcloud)
- [部署 Wordpress 到 AWS](../../user-guide/deploying-app-on-aws)
- [部署 Nginx 到 Kubernetes](../../user-guide/deploying-app-on-k8s)

## 应用版本管理

“应用版本”对于一款应用来说是非常重要的概念。一款应用从创建、发布到更新，很可能需要提交多个应用版本，且每个版本中都包括完整的应用服务功能，其主要属性如下:

- ID：应用版本的 ID，由系统自动生成，也可用于搜索该应用。
- 名称：请为您的应用版本命名一个规范的版本名或版本号，帮助用户辨别应用的版本信息。
- 压缩包：文件格式支持TAR，TAR.GZ，TAR.BZ和ZIP
- 描述：简单介绍当前应用版本的主要功能和特性，让用户进一步了解该版本的更新信息。

### 创建应用版本
在提交了第一个应用并了解了应用版本的主要属性后，我们开始为该应用创建新的版本。注意，完成新版本的开发之后，还需要修改版本号，版本号匹配配置包中 package.json 的 `version` 字段， `version` 字段的值不能与该应用已上传的版本号重复，且应用名 (package.json 中 "name" 字段的值) 应该保持不变。例如，将 version 从 0.1.0 修改为 0.1.2，然后重新生成一个配置包。

```
"version":"0.1.2"
```

已有一个或多个版本存在时，可以点击 **创建** 按钮，上传新的应用配置包成功后，点击 **提交**，创建新的应用版本。

![创建应用版本-Wordpress](/create-new-version-wp.png)

![提交应用版本](/new-version-submit.png)

同样，待新创建的应用版本由管理员审核通过后，可将新的版本发布到商店的同款应用下。


## 下架应用

应用发布到商店后，若需要下架应用需联系管理员，提交下架申请并等待管理员审核，下架的应用版本可能还有用户在使用，所以对于用户而言开发者依旧要给予及时的响应和服务。当所有版本都下架时该应用也会自动下架。

如果管理员要下架某款应用，在应用列表中点击应用进入详情页，点击 **暂停** 即可下架应用。若要恢复上架可以点击 **恢复**。

![下架应用](/suspend-app.png)

## 删除应用

当应用下架或应用配置包有问题时，可能需要删除应用释放资源。进入 **我的应用**，在应用列表选中需要删除的应用，点击 **删除** 按钮即可。
![删除应用](/delete-app.png)

