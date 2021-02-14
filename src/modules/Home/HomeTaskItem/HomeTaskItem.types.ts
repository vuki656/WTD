import type { TouchableOpacityProps } from 'react-native'

import type { HistoryTaskType } from '../HomeTaskList'

export type HomeTaskItemProps = Pick<TouchableOpacityProps, 'onLongPress'> & {
    task: HistoryTaskType
}
