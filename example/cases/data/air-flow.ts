import { IData, ILink } from '../../../src';

const originalNodes: Record<string, string | Record<string, string>>[] = [
  {
    id: 'marker.dim_feature_map__id_s0_live.local',
    value: {
      label: 'marker.dim_feature_map__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dwd_eventid_click_last_di__id_s0_live.local',
    value: {
      label: 'marker.dwd_eventid_click_last_di__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dwd_eventid_view_di__id_s0_live.local',
    value: {
      label: 'marker.dwd_eventid_view_di__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dwd_eventid_atc_di__id_s0_live.local',
    value: {
      label: 'marker.dwd_eventid_atc_di__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
    value: {
      label: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dwd_eventid_impress_di__id_s0_live.local',
    value: {
      label: 'marker.dwd_eventid_impress_di__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_traffic_view_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_traffic_view_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_detail_traffic_view_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_detail_traffic_view_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_order_events_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_order_events_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_detail_order_events_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_detail_order_events_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_traffic_impress_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_traffic_impress_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_detail_traffic_impress_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_detail_traffic_impress_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_traffic_atc_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_traffic_atc_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.dws_feature_detail_traffic_atc_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.dws_feature_detail_traffic_atc_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_feature_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.ads_feature_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_feature_detail_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.ads_feature_detail_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_featuregroup_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.ads_featuregroup_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_all_lead_1d__id_s0_live.regional',
    value: {
      label: 'marker.ads_all_lead_1d__id_s0_live.regional',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_advertise_params_1d__id_s0_live.local',
    value: {
      label: 'marker.ads_advertise_params_1d__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_advertise_placement_traffic_1d__id_s0_live.local',
    value: {
      label: 'marker.ads_advertise_placement_traffic_1d__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_advertise_placement_order_1d__id_s0_live.local',
    value: {
      label: 'marker.ads_advertise_placement_order_1d__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'marker.ads_advertise_health_placement_1d__id_s0_live.local',
    value: {
      label: 'marker.ads_advertise_health_placement_1d__id_s0_live.local',
      labelStyle: 'fill:black;',
      style: 'fill:PaleTurquoise;',
    },
  },
  {
    id: 'start',
    value: {
      label: 'start',
      labelStyle: 'fill:#000;',
      style: 'fill:#e8f7e4;',
    },
  },
  {
    id: 'end',
    value: {
      label: 'end',
      labelStyle: 'fill:#000;',
      style: 'fill:#e8f7e4;',
    },
  },
  {
    id: 'depend',
    value: {
      label: 'depend',
      labelStyle: 'fill:#000;',
      style: 'fill:#e8f7e4;',
    },
  },
  {
    id: 'dim_feature_map_local',
    value: {
      label: 'dim_feature_map_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dwd_eventid_click_last_di_local',
    value: {
      label: 'dwd_eventid_click_last_di_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_click_task',
    value: {
      label: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_click_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dwd_eventid_view_di_local',
    value: {
      label: 'dwd_eventid_view_di_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#e8f7e4;',
    },
  },
  {
    id: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_view_task',
    value: {
      label: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_view_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dwd_eventid_atc_di_local',
    value: {
      label: 'dwd_eventid_atc_di_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'depend_on_item_mart_item_dim_task',
    value: {
      label: 'depend_on_item_mart_item_dim_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dwd_eventid_item_order_events_di_local',
    value: {
      label: 'dwd_eventid_item_order_events_di_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'depend_on_order_mart_genesis_order_dwd_task',
    value: {
      label: 'depend_on_order_mart_genesis_order_dwd_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dwd_eventid_impress_di_local',
    value: {
      label: 'dwd_eventid_impress_di_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#e8f7e4;',
    },
  },
  {
    id: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_impress_task',
    value: {
      label: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_impress_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dws_all_traffic_view_lead_1d_regional',
    value: {
      label: 'dws_all_traffic_view_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_traffic_view_lead_1d_regional',
    value: {
      label: 'dws_feature_traffic_view_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_detail_traffic_view_lead_1d_regional',
    value: {
      label: 'dws_feature_detail_traffic_view_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_all_order_events_lead_1d_regional',
    value: {
      label: 'dws_all_order_events_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'depend_on_order_mart_genesis_order_dws_seller_task',
    value: {
      label: 'depend_on_order_mart_genesis_order_dws_seller_task',
      labelStyle: 'fill:#000;',
      style: 'fill:#e6f1f2;',
    },
  },
  {
    id: 'dws_feature_order_events_lead_1d_regional',
    value: {
      label: 'dws_feature_order_events_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_detail_order_events_lead_1d_regional',
    value: {
      label: 'dws_feature_detail_order_events_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_all_traffic_impress_lead_1d_regional',
    value: {
      label: 'dws_all_traffic_impress_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_traffic_impress_lead_1d_regional',
    value: {
      label: 'dws_feature_traffic_impress_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_detail_traffic_impress_lead_1d_regional',
    value: {
      label: 'dws_feature_detail_traffic_impress_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_all_traffic_atc_lead_1d_regional',
    value: {
      label: 'dws_all_traffic_atc_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_traffic_atc_lead_1d_regional',
    value: {
      label: 'dws_feature_traffic_atc_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'dws_feature_detail_traffic_atc_lead_1d_regional',
    value: {
      label: 'dws_feature_detail_traffic_atc_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_feature_lead_1d_regional',
    value: {
      label: 'ads_feature_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_feature_detail_lead_1d_regional',
    value: {
      label: 'ads_feature_detail_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_featuregroup_lead_1d_regional',
    value: {
      label: 'ads_featuregroup_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_all_lead_1d_regional',
    value: {
      label: 'ads_all_lead_1d_regional',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_advertise_params_1d_local',
    value: {
      label: 'ads_advertise_params_1d_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_advertise_placement_traffic_1d_local',
    value: {
      label: 'ads_advertise_placement_traffic_1d_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_advertise_placement_order_1d_local',
    value: {
      label: 'ads_advertise_placement_order_1d_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'ads_advertise_health_placement_1d_local',
    value: {
      label: 'ads_advertise_health_placement_1d_local',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dim_feature_map__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dim_feature_map__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dim_feature_map__id_s0_live',
    value: {
      label: 'repair_mp_foa_dim_feature_map__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_click_last_di__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_click_last_di__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_click_last_di__id_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_click_last_di__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_view_di__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_view_di__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_view_di__id_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_view_di__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_atc_di__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_atc_di__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_atc_di__id_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_atc_di__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_item_order_events_di__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_item_order_events_di__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_item_order_events_di__id_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_item_order_events_di__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_impress_di__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_impress_di__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dwd_eventid_impress_di__id_s0_live',
    value: {
      label: 'repair_mp_foa_dwd_eventid_impress_di__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_view_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_view_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_view_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_view_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_order_events_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_order_events_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_order_events_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_order_events_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_order_events_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_order_events_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_order_events_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_order_events_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_feature_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_feature_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_feature_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_feature_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_feature_detail_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_feature_detail_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_feature_detail_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_feature_detail_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_featuregroup_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_featuregroup_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_featuregroup_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_featuregroup_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_all_lead_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_all_lead_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_all_lead_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_all_lead_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_params_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_params_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_params_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_params_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_placement_traffic_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_placement_traffic_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_placement_traffic_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_placement_traffic_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_placement_order_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_placement_order_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_placement_order_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_placement_order_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_health_placement_1d__reg_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_health_placement_1d__reg_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'repair_mp_foa_ads_advertise_health_placement_1d__id_s0_live',
    value: {
      label: 'repair_mp_foa_ads_advertise_health_placement_1d__id_s0_live',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
  {
    id: 'mattermost',
    value: {
      label: 'mattermost',
      labelStyle: 'fill:#000;',
      style: 'fill:#fff;',
    },
  },
];

const edges: Record<'u' | 'v', string>[] = [
  {
    u: 'marker.ads_advertise_params_1d__id_s0_live.local',
    v: 'ads_advertise_health_placement_1d_local',
  },
  {
    u: 'marker.ads_advertise_placement_traffic_1d__id_s0_live.local',
    v: 'ads_advertise_health_placement_1d_local',
  },
  {
    u: 'marker.ads_advertise_placement_order_1d__id_s0_live.local',
    v: 'ads_advertise_health_placement_1d_local',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'ads_advertise_params_1d_local',
  },
  {
    u: 'marker.dwd_eventid_impress_di__id_s0_live.local',
    v: 'ads_advertise_params_1d_local',
  },
  {
    u: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
    v: 'ads_advertise_params_1d_local',
  },
  {
    u: 'marker.ads_advertise_params_1d__id_s0_live.local',
    v: 'ads_advertise_placement_order_1d_local',
  },
  {
    u: 'marker.ads_advertise_params_1d__id_s0_live.local',
    v: 'ads_advertise_placement_traffic_1d_local',
  },
  {
    u: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
    v: 'ads_all_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
    v: 'ads_all_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
    v: 'ads_all_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
    v: 'ads_all_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_detail_order_events_lead_1d__id_s0_live.regional',
    v: 'ads_feature_detail_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_detail_traffic_atc_lead_1d__id_s0_live.regional',
    v: 'ads_feature_detail_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_detail_traffic_view_lead_1d__id_s0_live.regional',
    v: 'ads_feature_detail_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_detail_traffic_impress_lead_1d__id_s0_live.regional',
    v: 'ads_feature_detail_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_traffic_view_lead_1d__id_s0_live.regional',
    v: 'ads_feature_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_traffic_impress_lead_1d__id_s0_live.regional',
    v: 'ads_feature_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_order_events_lead_1d__id_s0_live.regional',
    v: 'ads_feature_lead_1d_regional',
  },
  {
    u: 'marker.dws_feature_traffic_atc_lead_1d__id_s0_live.regional',
    v: 'ads_feature_lead_1d_regional',
  },
  {
    u: 'marker.ads_feature_lead_1d__id_s0_live.regional',
    v: 'ads_featuregroup_lead_1d_regional',
  },
  {
    u: 'start',
    v: 'depend',
  },
  {
    u: 'depend',
    v: 'depend_on_item_mart_item_dim_task',
  },
  {
    u: 'depend',
    v: 'depend_on_order_mart_genesis_order_dwd_task',
  },
  {
    u: 'depend',
    v: 'depend_on_order_mart_genesis_order_dws_seller_task',
  },
  {
    u: 'depend',
    v: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_click_task',
  },
  {
    u: 'depend',
    v: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_impress_task',
  },
  {
    u: 'depend',
    v: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_view_task',
  },
  {
    u: 'start',
    v: 'dim_feature_map_local',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'dwd_eventid_atc_di_local',
  },
  {
    u: 'depend_on_item_mart_item_dim_task',
    v: 'dwd_eventid_atc_di_local',
  },
  {
    u: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_click_task',
    v: 'dwd_eventid_click_last_di_local',
  },
  {
    u: 'marker.dim_feature_map__id_s0_live.local',
    v: 'dwd_eventid_click_last_di_local',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'dwd_eventid_impress_di_local',
  },
  {
    u: 'marker.dim_feature_map__id_s0_live.local',
    v: 'dwd_eventid_impress_di_local',
  },
  {
    u: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_impress_task',
    v: 'dwd_eventid_impress_di_local',
  },
  {
    u: 'depend_on_order_mart_genesis_order_dwd_task',
    v: 'dwd_eventid_item_order_events_di_local',
  },
  {
    u: 'marker.dwd_eventid_atc_di__id_s0_live.local',
    v: 'dwd_eventid_item_order_events_di_local',
  },
  {
    u: 'depend_on_traffic_shopee_dwd_event_stream_civ_group_hi_traffic_view_task',
    v: 'dwd_eventid_view_di_local',
  },
  {
    u: 'marker.dim_feature_map__id_s0_live.local',
    v: 'dwd_eventid_view_di_local',
  },
  {
    u: 'marker.dwd_eventid_click_last_di__id_s0_live.local',
    v: 'dwd_eventid_view_di_local',
  },
  {
    u: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
    v: 'dws_all_order_events_lead_1d_regional',
  },
  {
    u: 'depend_on_order_mart_genesis_order_dws_seller_task',
    v: 'dws_all_order_events_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_atc_di__id_s0_live.local',
    v: 'dws_all_traffic_atc_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_impress_di__id_s0_live.local',
    v: 'dws_all_traffic_impress_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'dws_all_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
    v: 'dws_feature_detail_order_events_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
    v: 'dws_feature_detail_order_events_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_atc_di__id_s0_live.local',
    v: 'dws_feature_detail_traffic_atc_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
    v: 'dws_feature_detail_traffic_atc_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_impress_di__id_s0_live.local',
    v: 'dws_feature_detail_traffic_impress_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
    v: 'dws_feature_detail_traffic_impress_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'dws_feature_detail_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dim_feature_map__id_s0_live.local',
    v: 'dws_feature_detail_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
    v: 'dws_feature_detail_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
    v: 'dws_feature_order_events_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
    v: 'dws_feature_order_events_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_atc_di__id_s0_live.local',
    v: 'dws_feature_traffic_atc_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
    v: 'dws_feature_traffic_atc_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_impress_di__id_s0_live.local',
    v: 'dws_feature_traffic_impress_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
    v: 'dws_feature_traffic_impress_lead_1d_regional',
  },
  {
    u: 'marker.dwd_eventid_view_di__id_s0_live.local',
    v: 'dws_feature_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dim_feature_map__id_s0_live.local',
    v: 'dws_feature_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
    v: 'dws_feature_traffic_view_lead_1d_regional',
  },
  {
    u: 'marker.ads_all_lead_1d__id_s0_live.regional',
    v: 'end',
  },
  {
    u: 'marker.ads_feature_detail_lead_1d__id_s0_live.regional',
    v: 'end',
  },
  {
    u: 'marker.ads_featuregroup_lead_1d__id_s0_live.regional',
    v: 'end',
  },
  {
    u: 'marker.ads_advertise_health_placement_1d__id_s0_live.local',
    v: 'end',
  },
  {
    u: 'repair_mp_foa_ads_advertise_health_placement_1d__id_s0_live',
    v: 'marker.ads_advertise_health_placement_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_health_placement_1d__reg_s0_live',
    v: 'marker.ads_advertise_health_placement_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_params_1d__reg_s0_live',
    v: 'marker.ads_advertise_params_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_params_1d__id_s0_live',
    v: 'marker.ads_advertise_params_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_placement_order_1d__id_s0_live',
    v: 'marker.ads_advertise_placement_order_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_placement_order_1d__reg_s0_live',
    v: 'marker.ads_advertise_placement_order_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_placement_traffic_1d__id_s0_live',
    v: 'marker.ads_advertise_placement_traffic_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_advertise_placement_traffic_1d__reg_s0_live',
    v: 'marker.ads_advertise_placement_traffic_1d__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_ads_all_lead_1d__reg_s0_live',
    v: 'marker.ads_all_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_all_lead_1d__id_s0_live',
    v: 'marker.ads_all_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_feature_detail_lead_1d__id_s0_live',
    v: 'marker.ads_feature_detail_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_feature_detail_lead_1d__reg_s0_live',
    v: 'marker.ads_feature_detail_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_feature_lead_1d__reg_s0_live',
    v: 'marker.ads_feature_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_feature_lead_1d__id_s0_live',
    v: 'marker.ads_feature_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_featuregroup_lead_1d__id_s0_live',
    v: 'marker.ads_featuregroup_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_ads_featuregroup_lead_1d__reg_s0_live',
    v: 'marker.ads_featuregroup_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dim_feature_map__id_s0_live',
    v: 'marker.dim_feature_map__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dim_feature_map__reg_s0_live',
    v: 'marker.dim_feature_map__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_atc_di__id_s0_live',
    v: 'marker.dwd_eventid_atc_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_atc_di__reg_s0_live',
    v: 'marker.dwd_eventid_atc_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_click_last_di__id_s0_live',
    v: 'marker.dwd_eventid_click_last_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_click_last_di__reg_s0_live',
    v: 'marker.dwd_eventid_click_last_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_impress_di__id_s0_live',
    v: 'marker.dwd_eventid_impress_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_impress_di__reg_s0_live',
    v: 'marker.dwd_eventid_impress_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_item_order_events_di__id_s0_live',
    v: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_item_order_events_di__reg_s0_live',
    v: 'marker.dwd_eventid_item_order_events_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_view_di__id_s0_live',
    v: 'marker.dwd_eventid_view_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dwd_eventid_view_di__reg_s0_live',
    v: 'marker.dwd_eventid_view_di__id_s0_live.local',
  },
  {
    u: 'repair_mp_foa_dws_all_order_events_lead_1d__reg_s0_live',
    v: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_order_events_lead_1d__id_s0_live',
    v: 'marker.dws_all_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__reg_s0_live',
    v: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__id_s0_live',
    v: 'marker.dws_all_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__reg_s0_live',
    v: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__id_s0_live',
    v: 'marker.dws_all_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_view_lead_1d__reg_s0_live',
    v: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_all_traffic_view_lead_1d__id_s0_live',
    v: 'marker.dws_all_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__id_s0_live',
    v: 'marker.dws_feature_detail_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_detail_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__id_s0_live',
    v: 'marker.dws_feature_detail_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_detail_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__id_s0_live',
    v: 'marker.dws_feature_detail_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_detail_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_detail_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__id_s0_live',
    v: 'marker.dws_feature_detail_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_order_events_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_order_events_lead_1d__id_s0_live',
    v: 'marker.dws_feature_order_events_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__id_s0_live',
    v: 'marker.dws_feature_traffic_atc_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__id_s0_live',
    v: 'marker.dws_feature_traffic_impress_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__reg_s0_live',
    v: 'marker.dws_feature_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__id_s0_live',
    v: 'marker.dws_feature_traffic_view_lead_1d__id_s0_live.regional',
  },
  {
    u: 'end',
    v: 'mattermost',
  },
  {
    u: 'ads_advertise_health_placement_1d_local',
    v: 'repair_mp_foa_ads_advertise_health_placement_1d__id_s0_live',
  },
  {
    u: 'ads_advertise_health_placement_1d_local',
    v: 'repair_mp_foa_ads_advertise_health_placement_1d__reg_s0_live',
  },
  {
    u: 'ads_advertise_params_1d_local',
    v: 'repair_mp_foa_ads_advertise_params_1d__id_s0_live',
  },
  {
    u: 'ads_advertise_params_1d_local',
    v: 'repair_mp_foa_ads_advertise_params_1d__reg_s0_live',
  },
  {
    u: 'ads_advertise_placement_order_1d_local',
    v: 'repair_mp_foa_ads_advertise_placement_order_1d__id_s0_live',
  },
  {
    u: 'ads_advertise_placement_order_1d_local',
    v: 'repair_mp_foa_ads_advertise_placement_order_1d__reg_s0_live',
  },
  {
    u: 'ads_advertise_placement_traffic_1d_local',
    v: 'repair_mp_foa_ads_advertise_placement_traffic_1d__id_s0_live',
  },
  {
    u: 'ads_advertise_placement_traffic_1d_local',
    v: 'repair_mp_foa_ads_advertise_placement_traffic_1d__reg_s0_live',
  },
  {
    u: 'ads_all_lead_1d_regional',
    v: 'repair_mp_foa_ads_all_lead_1d__id_s0_live',
  },
  {
    u: 'ads_all_lead_1d_regional',
    v: 'repair_mp_foa_ads_all_lead_1d__reg_s0_live',
  },
  {
    u: 'ads_feature_detail_lead_1d_regional',
    v: 'repair_mp_foa_ads_feature_detail_lead_1d__id_s0_live',
  },
  {
    u: 'ads_feature_detail_lead_1d_regional',
    v: 'repair_mp_foa_ads_feature_detail_lead_1d__reg_s0_live',
  },
  {
    u: 'ads_feature_lead_1d_regional',
    v: 'repair_mp_foa_ads_feature_lead_1d__id_s0_live',
  },
  {
    u: 'ads_feature_lead_1d_regional',
    v: 'repair_mp_foa_ads_feature_lead_1d__reg_s0_live',
  },
  {
    u: 'ads_featuregroup_lead_1d_regional',
    v: 'repair_mp_foa_ads_featuregroup_lead_1d__id_s0_live',
  },
  {
    u: 'ads_featuregroup_lead_1d_regional',
    v: 'repair_mp_foa_ads_featuregroup_lead_1d__reg_s0_live',
  },
  {
    u: 'dim_feature_map_local',
    v: 'repair_mp_foa_dim_feature_map__id_s0_live',
  },
  {
    u: 'dim_feature_map_local',
    v: 'repair_mp_foa_dim_feature_map__reg_s0_live',
  },
  {
    u: 'dwd_eventid_atc_di_local',
    v: 'repair_mp_foa_dwd_eventid_atc_di__id_s0_live',
  },
  {
    u: 'dwd_eventid_atc_di_local',
    v: 'repair_mp_foa_dwd_eventid_atc_di__reg_s0_live',
  },
  {
    u: 'dwd_eventid_click_last_di_local',
    v: 'repair_mp_foa_dwd_eventid_click_last_di__id_s0_live',
  },
  {
    u: 'dwd_eventid_click_last_di_local',
    v: 'repair_mp_foa_dwd_eventid_click_last_di__reg_s0_live',
  },
  {
    u: 'dwd_eventid_impress_di_local',
    v: 'repair_mp_foa_dwd_eventid_impress_di__id_s0_live',
  },
  {
    u: 'dwd_eventid_impress_di_local',
    v: 'repair_mp_foa_dwd_eventid_impress_di__reg_s0_live',
  },
  {
    u: 'dwd_eventid_item_order_events_di_local',
    v: 'repair_mp_foa_dwd_eventid_item_order_events_di__id_s0_live',
  },
  {
    u: 'dwd_eventid_item_order_events_di_local',
    v: 'repair_mp_foa_dwd_eventid_item_order_events_di__reg_s0_live',
  },
  {
    u: 'dwd_eventid_view_di_local',
    v: 'repair_mp_foa_dwd_eventid_view_di__id_s0_live',
  },
  {
    u: 'dwd_eventid_view_di_local',
    v: 'repair_mp_foa_dwd_eventid_view_di__reg_s0_live',
  },
  {
    u: 'dws_all_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_order_events_lead_1d__id_s0_live',
  },
  {
    u: 'dws_all_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_order_events_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_all_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__id_s0_live',
  },
  {
    u: 'dws_all_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_atc_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_all_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__id_s0_live',
  },
  {
    u: 'dws_all_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_impress_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_all_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_view_lead_1d__id_s0_live',
  },
  {
    u: 'dws_all_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_all_traffic_view_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_detail_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_detail_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_order_events_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_atc_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_impress_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_detail_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_detail_traffic_view_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_order_events_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_order_events_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_order_events_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_traffic_atc_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_atc_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_traffic_impress_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_impress_lead_1d__reg_s0_live',
  },
  {
    u: 'dws_feature_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__id_s0_live',
  },
  {
    u: 'dws_feature_traffic_view_lead_1d_regional',
    v: 'repair_mp_foa_dws_feature_traffic_view_lead_1d__reg_s0_live',
  },
];

export const nodes = originalNodes.map((o) => {
  return {
    id: o.id,
    text: o.id,
    width: o.id === 'dws_feature_traffic_view_lead_1d_regional' ? 500 : undefined,
  } as IData;
});

export const links = edges.map((e) => {
  // const text = 'hello world';
  return {
    from: { id: e.u },
    to: { id: e.v },
    // attr: {
    //   text,
    // },
  } as ILink;
});
