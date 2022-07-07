import React, { useContext, useEffect, useState } from 'react'
import AdminPanelAddUserDisplay from './admin-panel-add-user-display';
import AdminPanelCommentsDisplay from './admin-panel-comments-display';
import AdminPanelDashboardDisplay from './admin-panel-dashboard-display';
import AdminPanelEditUserDisplay from './admin-panel-edit-user-display';
import AdminPanelLogsDisplay from './admin-panel-logs-display';
import AdminPanelPostsDisplay from './admin-panel-posts-display';
import AdminPanelSettingsDisplay from './admin-panel-settings-display';
import AdminPanelUserDisplay from './admin-panel-users-display';
import './style.css';

export default function AdminPanelDisplay({selectedPageIndex}) {
    return (
        <>
            {
                (()=>{
                    switch(selectedPageIndex){
                        case 0:{
                            return <AdminPanelDashboardDisplay />;
                        }
                        case 1:{
                            return <AdminPanelUserDisplay />;
                        }
                        case 2:{
                            return <AdminPanelPostsDisplay /> ;
                        }
                        case 3:{
                            return <AdminPanelCommentsDisplay /> ;
                        }
                        case 4:{
                            return <AdminPanelLogsDisplay /> ;
                        }
                        case 5:{
                            return <AdminPanelSettingsDisplay /> ;
                        }
                        case 6:{
                            return <AdminPanelAddUserDisplay /> ;
                        }
                        case 7:{
                            return <AdminPanelEditUserDisplay /> ;
                        }
                    }
                })()
            }
        </>
    );
}