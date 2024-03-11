import React from 'react';
import { CDBSidebar, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { home, person, construct, help, list, add, logOut ,informationCircleOutline,barChartOutline,pieChart,analytics} from 'ionicons/icons';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<IonIcon icon={home} style={{ fontSize: '1.5rem' }} />}>
          <NavLink to="/dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
            Admin Panel
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarMenu>
          <NavLink to="/dashboard" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={home} style={{ fontSize: '1.2rem' }} />
              Home Page
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/user-details" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={person} style={{ fontSize: '1.2rem' }} />
              User Details
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/user-contributions" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={construct} style={{ fontSize: '1.2rem' }} />
              User Contributions
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/all-questions" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={list} style={{ fontSize: '1.2rem' }} />
              System Based Questions
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/add-question" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={add} style={{ fontSize: '1.2rem' }} />
              Posts
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/support" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={informationCircleOutline} style={{ fontSize: '1.2rem' }} />
              Support
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/admin-tasks" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={barChartOutline} style={{ fontSize: '1.2rem' }} />
              Admin Tasks
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/chart-activites" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={pieChart} style={{ fontSize: '1.2rem' }} />
              Admin Gantt Chart
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink to="/dashboard/mock-analysis" className="nav-link">
            <CDBSidebarMenuItem>
              <IonIcon icon={analytics} style={{ fontSize: '1.2rem' }} />
               Mock Interview Anaylsis 
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 2px' }}>
            <Link to="/" className="btn btn-light btn-block">
              <IonIcon icon={logOut} style={{ fontSize: '1.2rem' }} />
              Logout
            </Link>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
