import { WaringColor } from '../color'

export default class Waring implements WaringItem {
  id: string
  dateTime: Date
  description: string
  title: string
  status: string
  level: string
  type: number
  typeName: string
  related?: string | undefined
  sender?: string | undefined
  startTime?: string | undefined
  endTime?: string | undefined
  urgency?: string | undefined
  color?: string | undefined
  backgroundColor?: string | undefined

  constructor({
    id,
    dateTime,
    description,
    title,
    status,
    level,
    type,
    typeName,
    related,
    sender,
    startTime,
    endTime,
    urgency,
  }: WaringItem) {
    this.id = id
    this.dateTime = dateTime
    this.description = description
    this.title = title
    this.status = status
    this.level = level
    this.type = type
    this.typeName = typeName
    this.related = related
    this.sender = sender
    this.startTime = startTime
    this.endTime = endTime
    this.urgency = urgency
    this.color = WaringColor.getWaringColor(level).color
    this.backgroundColor = WaringColor.getWaringColor(level).backgroundColor
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('HH:mm')
  }
}
