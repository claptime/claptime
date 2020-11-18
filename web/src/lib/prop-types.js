import PropTypes from 'prop-types';

PropTypes.claptime = {
  collection: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  collectionCategory: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  starringVideoNode: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    videoNode: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  credit: PropTypes.shape({
    role: PropTypes.string,
    profile: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    customProfile: PropTypes.string,
  }),
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    biography: PropTypes.string.isRequired,
  }),
  videoNode: PropTypes.shape({
    synopsis: PropTypes.string,
    festivals: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default PropTypes;
