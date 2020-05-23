import moment from 'moment';

class MockItemUtil {
    
    static GetNewDayItem(){
        return {day: moment().days(), timeItems: [this.GetNewTimeItem()]};
    }

    static GetNewTimeItem(){
        return {hour: moment().hours(), minute: moment().minutes(), capacity: 0};
    }
}

export default MockItemUtil; 