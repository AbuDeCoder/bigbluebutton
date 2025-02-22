import React from 'react';
import { withModalMounter } from '/imports/ui/components/modal/service';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/ui/local-collections/users-collection/users';
import Meetings from '/imports/ui/local-collections/meetings-collection/meetings';
import Auth from '/imports/ui/services/auth';
import Service from './service';
import VideoPreview from './component';
import VideoService from '../video-provider/service';

const VideoPreviewContainer = props => <VideoPreview {...props} />;

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

const isCamLocked = () => {
  const meeting = Meetings.findOne({ meetingId: Auth.meetingID },
    { fields: { 'lockSettingsProps.disableCam': 1 } });
  const user = Users.findOne({ meetingId: Auth.meetingID, userId: Auth.userID },
    { fields: { locked: 1, role: 1 } });

  if (meeting.lockSettingsProps !== undefined) {
    if (user.locked && user.role !== ROLE_MODERATOR) {
      return meeting.lockSettingsProps.disableCam;
    }
  }
  return false;
};

export default withModalMounter(withTracker(({ mountModal }) => ({
  startSharing: (deviceId) => {
    mountModal(null);
    VideoService.joinVideo(deviceId);
  },
  stopSharing: (deviceId) => {
    mountModal(null);
    if (deviceId) {
      const streamId = VideoService.getMyStreamId(deviceId);
      if (streamId) VideoService.stopVideo(streamId);
    } else {
      VideoService.exitVideo();
    }
  },
  sharedDevices: VideoService.getSharedDevices(),
  isCamLocked: isCamLocked(),
  closeModal: () => mountModal(null),
  webcamDeviceId: Service.webcamDeviceId(),
  hasVideoStream: VideoService.hasVideoStream(),
}))(VideoPreviewContainer));
