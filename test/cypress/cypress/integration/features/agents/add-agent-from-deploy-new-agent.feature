Feature: Validate that the config to added new agent

    As a wazuh user
    I want to add a new agent
    in order to manage them

    @agent @actions
    Scenario Outline: Validate the information to add a new Agent
        Given The wazuh admin user is logged
        When The user navigates to the agent page
        And The user selects a deploy new agent
        Then The browser is on the new deploy agent page
        And A box with four steps to the different settings is displayed
        And A first step <subtitleFirst> is displayed and the following <options> options
        And A second step <subtitleSecond> with the <descriptionsSecond> are displayed and the following <secondInformation> by default
        And A third step <subtitleThird> with the <descriptionThird> are displayed and the following drop-down with Select group by default <informationThird>
        And A fourth step <subtitleFourth> with the <message> by default is displayed
        And An X button in the top right is displayed
        Examples:
            | subtitleFirst                 | options                                          | subtitleSecond         | descriptionsSecond                                                                                                                          | secondInformation   | subtitleThird                 | descriptionThird                     | informationThird   | subtitleFourth                 | message                               |
            | 'Chọn hệ điều hành' | 'Red Hat / CentOS,Debian / Ubuntu,Windows,MacOS' | 'Địa chỉ Wazuh server' | 'Đây là địa chỉ mà agent sử dụng để giao tiếp với máy chủ Wazuh, có thể là địa chỉ IP hoặc tên miền đủ điều kiện (FQDN).' | '172.19.0.4       ' | 'Đặt agent vào một nhóm' | 'Chọn một hoặc nhiều nhóm hiện có' | 'Chọn nhóm    ' | 'Cài đặt và đăng ký agent' | 'Vui lòng chọn hệ điều hành.' |
