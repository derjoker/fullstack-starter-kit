import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

const { Header, Content } = Layout

const MainLayout = ({ content }) => (
  <Layout>
    <Header style={{ width: '100%' }}>
      <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }} >
        <Menu.Item key='home'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='play'>
          <Link to='/play'>Play</Link>
        </Menu.Item>
        <Menu.Item key='about'>
          <Link to='/about'>About</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '12px' }}>
      <div style={{ background: '#fff', padding: '12px', minHeight: `${window.innerHeight - 88}px` }}>
        {content}
      </div>
    </Content>
  </Layout>
)

MainLayout.propTypes = {
  content: PropTypes.node.isRequired
}

export default MainLayout
