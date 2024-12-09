import React, { useState } from 'react';
import { useAuth } from '../Zustand/useAuth';
import { Card, Avatar, Typography, Space, Divider, Tag, Button, Modal } from 'antd';
import { UserOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;
import { MdVerified } from "react-icons/md";

const Profile = () => {
 const  navigate = useNavigate();
  const { userData, setUserData, delete_account } = useAuth(); // Retrieve user data and setUserData from Zustand
  const { id, name, email } = userData;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the confirmation modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    await delete_account();
    localStorage.removeItem("userData")
   navigate("/login")
    setIsModalVisible(false); // Close the modal after deleting
  };

  // Function to hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card
      style={{
        maxWidth: 500,
        margin: '30px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
      }}
      bordered={false}
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Avatar
          size={120}
          icon={<UserOutlined />}
          style={{
            backgroundColor: '#1890ff',
            marginBottom: 10,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Title className=' flex items-center justify-center' level={2} style={{ margin: 0, color: '#1890ff' }}>
          {name}<MdVerified className='text-[#1990FF] inline'/>
        </Title>
      </div>
      <Divider />
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <IdcardOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
          <Text strong>ID:</Text>
          <Text>{id}</Text>
        </Space>
        <Space>
          <MailOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
          <Text strong>Email:</Text>
          <Text>{email}</Text>
        </Space>
      </Space>

      {/* Delete Account Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          type="primary"
          danger
          onClick={showModal}
        >
          Delete Account
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Delete Account"
        open={isModalVisible}  // Changed 'visible' to 'open'
        onOk={handleDeleteAccount}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        destroyOnClose
      >
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Modal>
    </Card>
  );
};

export default Profile;
