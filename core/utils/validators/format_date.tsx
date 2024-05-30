
import moment from 'moment';

const formatDate = (date: moment.MomentInput) => {
    return moment(date).format('YYYY-MM-DD');
};

export{
    formatDate
}
