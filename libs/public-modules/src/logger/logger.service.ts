/* eslint-disable prefer-rest-params */
/**
 * 日志收集的服务端配置
 */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Configuration, configure, getLogger, Logger } from 'log4js';

export type LoggerServiceOptionType = Partial<Configuration> & {
  filename: string;
};

// 日志服务，加入log4js的日志写入
@Injectable()
export class LoggerService extends ConsoleLogger {
  log4js: Logger; // 类型
  filename: string; // 文件名

  constructor(options?: LoggerServiceOptionType) {
    super();
    const { filename = 'logs/all.log', ..._options } = options || {};
    this.filename = filename;

    // 配置
    configure({
      appenders: {
        all: {
          filename,
          type: 'dateFile',
          // 风格
          layout: { type: 'pattern', pattern: '%d [%p] %m' },
          // 日志文件的命名规则
          pattern: 'yyyy-MM-dd',
          // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
          keepFileExt: true,
          // 输出的日志文件名是都始终包含 pattern 日期结尾
          alwaysIncludePattern: true,
          // 指定日志保留的天数
          daysToKeep: 10,
        },
      },
      categories: { default: { appenders: ['all'], level: 'all' } },
      ..._options,
    });
    this.log4js = getLogger();
  }

  /**
   * 正常日志
   * @param message 日志消息
   * @param trace 日志的来源
   */
  log(message: any, trace: string) {
    super.log.apply(this, arguments);
    this.log4js.info(trace, message);
  }

  /**
   *错误日志
   * @param message 日志消息
   * @param trace 日志的来源
   */
  error(message: any, trace: string) {
    super.error.apply(this, arguments);
    this.log4js.error(trace, message);
  }

  /**
   *警告日志
   * @param message 日志消息
   * @param trace 日志的来源
   */
  warn(message: any, trace: string) {
    super.warn.apply(this, arguments);
    this.log4js.warn(trace, message);
  }

  /**
   *调试日志
   * @param message 日志消息
   * @param trace 日志的来源
   */
  debug(message: any, trace: string) {
    super.debug.apply(this, arguments);
    this.log4js.debug(trace, message);
  }

  /**
   *纤细的日志
   * @param message 日志消息
   * @param trace 日志的错误
   */
  verbose(message: any, trace: string) {
    super.verbose.apply(this, arguments);
    this.log4js.info(trace, message);
  }
}
