import Layout from './pages/Layout';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import base64 from 'base-64';
import './App.css';
import ApproveList from './pages/approve/ApproveList';
import AdminApproveList from './pages/adminapprove/AdminApproveList';
import AdminApproveBuyList from './pages/adminapprove/AdminApproveBuyList';
import AdminApproveHandle from './pages/adminapprove/AdminApproveHandleList';
import AdminApproveBuyHandle from './pages/adminapprove/AdminApproveBuyHandleList';
import ApproveBuyHandle from './pages/approve/ApproveBuyHandleList';
import Logout from './pages/login/Logout';
import Login from './pages/login/LoginHome';

import ApproveBuyList from './pages/approve/ApproveBuyList';
import UserList from './pages/users/UserList';
import ApproveHandleList from './pages/approve/ApproveHandleList';

import ITAssets from './pages/itassets/ITAssets';
import AssetDetail from './pages/itassets/AssetDetail';
import AssetAllList from './pages/itassets/AssetAllList';
import AdminMain from './pages/mainPage/AdminMain';
import Mypage from './pages/mainPage/Mypage';
import Reports from './pages/mainPage/Reports';
import UserMain from './pages/mainPage/UserMain';
import ReturnExchange from './pages/mainPage/ReturnExchange';
import UserMain_using from './pages/mainPage/UserMain_using';
import UserMain_request from './pages/mainPage/UserMain_request';
import Users from './pages/users/Users';
import ITAssetsApproval from './pages/itassets/ITAssetsApproval';
import HighAdminMain from './pages/mainPage/HighAdminMain';
import AssetRequestListPC from './pages/itassets/AssetRequestListPC';
import AssetRequestListSW from './pages/itassets/AssetRequestListSW';
import AssetRequestListSV from './pages/itassets/AssetRequestListSV';
import AssetRequestListETC from './pages/itassets/AssetRequestListETC';
import NoticeList from './pages/notice/NoticeList';
import NoticeWrite from './pages/notice/NoticeWrite';
import NoticeDetail from './pages/notice/NoticeDetail';

import NoticeUser from './pages/notice/NoticeUser';
import NoticeEdit from './pages/notice/NoticeEdit';

import TokenInfoProvider from './component/TokenInfoProvider';

function App() {
  return (
    <TokenInfoProvider>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login hideHeaderAndSidebar={true} />} />
          <Route path="/admin/approveList" element={<ApproveList />} />
          <Route path="/admin/approveHandle" element={<ApproveHandleList />} />
          <Route path="/admin/approveBuyList" element={<ApproveBuyList />} />
          <Route
            path="/admin/approveBuyHandle"
            element={<ApproveBuyHandle />}
          />
          <Route path="/highAdmin/approveList" element={<AdminApproveList />} />
          <Route
            path="/highAdmin/approveBuyList"
            element={<AdminApproveBuyList />}
          />
          <Route
            path="/highAdmin/approveHandle"
            element={<AdminApproveHandle />}
          />
          <Route
            path="/highAdmin/approveBuyHandle"
            element={<AdminApproveBuyHandle />}
          />

          <Route path="/logout" element={<Logout />} />

          <Route path="/users" element={<UserList />} />

          <Route path="/itassets" element={<AssetAllList />} />
          <Route path="/itassets/pc" element={<AssetRequestListPC />} />
          <Route path="/itassets/sw" element={<AssetRequestListSW />} />
          <Route path="/itassets/sv" element={<AssetRequestListSV />} />
          <Route path="/itassets/etc" element={<AssetRequestListETC />} />

          <Route path="/itassets/detail" element={<AssetDetail />} />
          <Route path="/adminitassets" element={<ITAssets />} />
          <Route path="itassetsapproval" element={<ITAssetsApproval />} />

          <Route path="/admin/adminMain" element={<AdminMain />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/user/userMain" element={<UserMain />} />
          <Route path="/admin/returnExchange" element={<ReturnExchange />} />
          <Route path="/user/userMain_using" element={<UserMain_using />} />
          <Route path="/user/userMain_request" element={<UserMain_request />} />
          <Route path="/highadmin/highAdminMain" element={<HighAdminMain />} />

          <Route path="/:page/:subPage/*" element={<Users />} />

          <Route path="/noticelist" element={<NoticeList />} />
          <Route path="/noticewrite" element={<NoticeWrite />} />
          <Route path="/noticedetail/:id/*" element={<NoticeDetail />} />
          {/*<Route path="/noticedetailuser" element={<NoticeDetailUser />} />*/}
          <Route path="/noticeuser" element={<NoticeUser />} />
          <Route path="/noticeedit" element={<NoticeEdit />} />
        </Routes>
      </BrowserRouter>
    </TokenInfoProvider>
  );
}

export default App;
